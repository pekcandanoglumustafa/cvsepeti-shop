import json,glob,re,sys
ph=re.compile(r'\{(s?\d+)\}')
src=json.load(open('i18n/kaynak/arayuz.json'))
def pattern(k):
    parts=re.split(r'(\{s?\d+\})',k); names=[]; out=''
    for p in parts:
        m=re.fullmatch(r'\{(s?\d+)\}',p)
        if m: names.append(m.group(1)); out+='(.+?)' if m.group(1)[0]=='s' else r'(\d+(?:[.,]\d+)*)'
        else: out+=re.escape(p)
    return re.compile('^'+out+'$',re.S),names
tot=fixed=0;left=[]
for l in sys.argv[1:]:
  DICT={}
  for g in glob.glob(f'i18n/ceviri/{l}/*.json'): DICT.update(json.load(open(g)))
  for f in sorted(glob.glob(f'i18n/ceviri/{l}/arayuz*.json')):
    d=json.load(open(f));ch=False
    for k,v in d.items():
      need=set(ph.findall(k))
      if not need or need<=set(ph.findall(v)): continue
      tot+=1
      rx,names=pattern(k); m=rx.match(src.get(k,''))
      nv=v; ok=bool(m)
      if m:
        vals={n:m.group(i+1) for i,n in enumerate(names)}
        # longest values first
        for n,val in sorted(vals.items(),key=lambda x:-len(x[1])):
          if '{'+n+'}' in nv: continue
          if n[0]=='s':
            cands=[x for x in [DICT.get(val),val] if x]
          else: cands=[val,val.replace('.',','),val.replace(',','.')]
          hit=None
          for c in cands:
            r=re.compile(re.escape(c)) if n[0]=='s' else re.compile(r'(?<![\d.,])'+re.escape(c)+r'(?![\d]|[.,]\d)')
            if len(r.findall(nv))==1: hit=r;break
          if not hit: ok=False;break
          nv=hit.sub('{'+n+'}',nv,1)
      if ok and need<=set(ph.findall(nv)):
        d[k]=nv;fixed+=1;ch=True
      else: left.append((l,f,k))
    if ch: json.dump(d,open(f,'w'),ensure_ascii=False,indent=0)
print('bad',tot,'fixed',fixed,'left',len(left))
json.dump(left,open('i18n/devir/ph_left.json','w'),ensure_ascii=False)
from collections import Counter;print(Counter(x[0] for x in left))
