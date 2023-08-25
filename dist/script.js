let pts = [],
    nPts = 12,
    lineLength = 60,
    timeScale = 0.5

const radius = 180,
      tl = gsap.timeline()

for (let i=0; i<nPts; i++){ // plot points + add circles
  const c = document.createElementNS("http://www.w3.org/2000/svg", "circle"),
        angle = (i/nPts * Math.PI *2)- Math.PI/2,
        x = Math.cos(angle)*radius,
        y = Math.sin(angle)*radius
  
  pts.push( x.toFixed(2) + ',' + y.toFixed(2) + ' ')

  gsap.set(c, {
    x:250,
    y:250,
    scale:0.8,
    attr:{class:'c'+i, r:3, cx:x, cy:y, fill:'#fff', stroke:'none'}
  })
  
  stage.appendChild(c);  
}


for (let i=0; i<=nPts; i++){ // add paths + animate
  const p = document.createElementNS("http://www.w3.org/2000/svg", "path")        
  
  gsap.set(p, {
    x:250,
    y:250,
    attr:{
      class:'line'+i,
      d:'M'+pts[i]+' C'+gsap.utils.wrap(pts,[i+2])+' '+gsap.utils.wrap(pts,[i-5])+' '+gsap.utils.wrap(pts,[i-2]),
      // d:'M'+pts[i]+' c 0,0 '+gsap.utils.wrap(pts,[i-nPts/2])+' '+gsap.utils.wrap(pts,[i-3]),
      'stroke-dasharray':lineLength+' '+lineLength,
      'stroke-dashoffset':lineLength
    },
  });
  
  stage.appendChild(p);
  
  const lineTL = gsap.timeline({repeat:-1, defaults:{duration:0.4}})
    .to(p, {attr:{'stroke-dashoffset':-lineLength}, ease:'expo.inOut', duration:0.6}, 0.4)
  
  if (i<nPts){
    lineTL.to('.c'+i, {scale:1.2, ease:'expo.inOut'}, 0.1)
    lineTL.to('.c'+i, {scale:0.8, ease:'expo.in'}, 0.5)
  }
  
  tl.add( lineTL, 1-i/nPts);
}

tl.play(5).timeScale(timeScale)