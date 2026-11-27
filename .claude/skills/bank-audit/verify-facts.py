#!/usr/bin/env python3
"""Verify every quote in a FACTS markdown file against the live docs page it cites.
Format per fact:
### F-01 · Topic
> verbatim quote (one blockquote line; may use ... only between two separate verbatim quotes? NO - one contiguous span)
Source: https://.../page   (optionally ".md" implied)
Usage: verify_facts.py FILE [FILE...]   -> prints FAIL lines, exit 1 on any failure.
Normalisation (applied to both sides): markdown links [t](url) -> t; backticks kept; curly quotes -> straight;
whitespace collapsed; table pipes kept as-is.
"""
import re,sys,hashlib,os,subprocess
C=os.environ.get('FACTS_CACHE','/tmp/ccdev-facts-cache'); os.makedirs(C,exist_ok=True)
def fetch(url):
    u=url.split('#')[0].rstrip('/')
    if not u.endswith('.md'): u+='.md'
    fn=os.path.join(C,hashlib.md5(u.encode()).hexdigest()+'.md')
    if not os.path.exists(fn):
        subprocess.run(['curl','-sL','-m','40','-H','Accept: text/markdown',u,'-o',fn],check=False)
    return open(fn,errors='ignore').read()
def norm(t):
    t=re.sub(r'\[([^\]]*)\]\((?:https?://|#|/)[^)]*\)',r'\1',t)
    t=t.replace('’',"'").replace('‘',"'").replace('“','"').replace('”','"')
    t=re.sub(r'\*\*|__','',t)
    return re.sub(r'\s+',' ',t).strip()
bad=0;n=0
for f in sys.argv[1:]:
    cur=None;quote=None
    for ln in open(f):
        ln=ln.rstrip('\n')
        m=re.match(r'###\s+([A-Z]-\d+)',ln)
        if m: cur=m.group(1);quote=[]; continue
        if ln.startswith('> ') and cur is not None: quote.append(ln[2:]); continue
        m=re.match(r'Source:\s*(https?://\S+)',ln)
        if m and cur and quote:
            n+=1
            doc=norm(fetch(m.group(1)))
            q=norm(' '.join(quote))
            if not doc: print(f'FAIL {cur}: could not fetch {m.group(1)}'); bad+=1
            elif q not in doc: print(f'FAIL {cur}: quote not found on {m.group(1)}\n     {q[:160]}'); bad+=1
            cur=None;quote=None
print(f'{n} facts checked, {bad} failed'); sys.exit(1 if bad else 0)
