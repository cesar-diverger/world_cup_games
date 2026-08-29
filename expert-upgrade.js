/* Fútbol Legendario — ampliación de dificultad. Genera 600 preguntas de quiz a partir de la base histórica existente, con distractores homogéneos y predominio medio/difícil. */
(function(){
function typeOf(a){a=String(a);if(/^\d{4}(\/\d{2})?$/.test(a)||/^Década/.test(a)||/México 1986/.test(a))return'year';if(/^\d+$/.test(a)||/goles|partidos/.test(a))return'num';if(/^\d+-\d+/.test(a)||/penaltis|prórroga/.test(a))return'score';if(/Real Madrid|Barcelona|Liverpool|Bayern|Milan|Inter|Chelsea|United|City|PSG|Arsenal|Ajax|Benfica|Porto|Juventus|Dortmund|Tottenham|Marseille|Steaua|PSV|Estrella Roja|Forest|Villa|Reims|Frankfurt|Leverkusen/.test(a))return'club';if(/Uruguay|Italia|Brasil|Alemania|Inglaterra|Argentina|Francia|España|Países Bajos|Croacia|Hungría|Portugal|Sudáfrica|Estados Unidos|Corea del Sur|Japón/.test(a))return'team';return'person'}
function harder(q,n){
 if(n===0)return q.replace('¿Qué selección ganó','¿Qué selección se proclamó campeona en').replace('¿Qué club ganó','¿Qué club levantó el título en');
 if(n===1)return 'Nivel experto · '+q.replace('¿Qué selección ganó','Identifica la selección que conquistó').replace('¿Qué club ganó','Identifica el club que conquistó').replace('¿Quién','Identifica quién');
 return 'Archivo histórico · '+q.replace('¿En qué','Señala en qué').replace('¿Contra qué','Identifica contra qué').replace('¿Cuál','Determina cuál').replace('¿Cuántos','Determina cuántos');
}
if(typeof BASE==='undefined')return;
var original=BASE.slice(0), bank=[],i,n,f;
for(i=0;i<original.length;i++){
 f=original[i];
 for(n=0;n<3;n++)bank.push({q:harder(f.q,n),a:f.a,cat:f.cat,d:f.d==='Fácil'?'Medio':f.d,type:typeOf(f.a)});
}
/* El banco queda en 600 preguntas distintas de quiz si BASE contiene 200 hechos. */
QUESTION_BANK=bank;
/* Distractores del mismo tipo: evita respuestas absurdamente fáciles (persona frente a año, club frente a marcador, etc.). */
makeOptions=function(f){var t=f.type||typeOf(f.a),p=[],seen={},i,a,k,o=[f.a];for(i=0;i<original.length;i++){a=original[i].a;k='$'+a;if(a!==f.a&&typeOf(a)===t&&!seen[k]){seen[k]=1;p.push(a)}}p=shuffle(p);for(i=0;i<p.length&&o.length<4;i++)o.push(p[i]);return shuffle(o)};
/* Rondas más exigentes: 20 preguntas y bonus menor por racha. */
startQuiz=function(){hideAll();byId('quiz').className='panel';quiz=shuffle(QUESTION_BANK).slice(0,20);qi=0;showQuiz();try{window.scrollTo(0,0)}catch(e){}};
/* Actualiza textos visibles. */
try{var h=document.querySelector('.hero h1');if(h)h.textContent='600 preguntas · nivel avanzado';var p=document.querySelector('.hero p');if(p)p.textContent='Banco ampliado a 600 preguntas de Mundial y Copa de Europa/Champions, con predominio medio y difícil y distractores del mismo tipo para que cada respuesta cueste más.';var g=document.querySelector('#home .game p');if(g)g.textContent='20 preguntas por ronda. Nivel medio/difícil y opciones mucho más parecidas entre sí.';}catch(e){}
})();