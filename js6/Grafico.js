import ReactDOM from 'react-dom';
import React from 'react';

let audioStreamPromise=navigator.mediaDevices.getUserMedia({audio: true, video:false})
const TAMANIO_GRAFICO=20
export function Graficador(props){

        function promediosPorVentana(datos,cantidad){

            let ret=[];
            for(let b=0;b<cantidad;b++){
                
                let semiLargo=Math.floor(datos.length/cantidad);
                let suma=0;
                let q=0;
                for(let i=b*semiLargo;i<(b+1)*semiLargo;i++){
                    suma+=0.0+datos[i];
                    q++;
                }
                ret.push(suma/q);
            }
            return ret;
        }

        function desviacionesPorVentana(datos,cantidad){

            let ret=[];
            for(let b=0;b<cantidad;b++){
                
                let semiLargo=Math.floor(datos.length/cantidad);
                let suma=0;
                let q=0;
                for(let i=b*semiLargo;i<(b+1)*semiLargo;i++){
                    suma+=0.0+datos[i];
                    q++;
                }
                let promedio = suma/q;

                let sumaDifs=0;
                for(let i=b*semiLargo;i<(b+1)*semiLargo;i++){
                    sumaDifs+=(datos[i]-promedio)*(datos[i]-promedio);
                }

                ret.push(Math.sqrt(sumaDifs/q));
                
            }
            return ret;
        }

        let canvas=document.getElementById("canvas");

        if(canvas==null) return <span></span>;

        let ctx=canvas.getContext("2d");
        let dataArray = props.datos;
        
        ctx.fillStyle="blue";
        
            
            ctx.clearRect(0,0,canvas.width,canvas.height);
            
            ctx.fillRect(0,0,TAMANIO_GRAFICO,TAMANIO_GRAFICO);
            ctx.strokeStyle="black";
            ctx.beginPath();
            ctx.moveTo(0,TAMANIO_GRAFICO);

            
            for(let i=0;i<dataArray.length;i++){
                ctx.lineTo(i/dataArray.length*TAMANIO_GRAFICO,TAMANIO_GRAFICO-dataArray[i]/256*TAMANIO_GRAFICO);
            }
            ctx.stroke();

            ctx.strokeStyle="red";
            ctx.beginPath();
            ctx.moveTo(0,TAMANIO_GRAFICO);
            let promedios=promediosPorVentana(dataArray,20)
            for(let i=0;i<promedios.length;i++){
                ctx.lineTo(i/promedios.length*TAMANIO_GRAFICO,TAMANIO_GRAFICO-promedios[i]/256*TAMANIO_GRAFICO);
            }
            ctx.stroke();

            ctx.strokeStyle="green";
            ctx.beginPath();
            ctx.moveTo(0,TAMANIO_GRAFICO);
            let desviaciones=desviacionesPorVentana(dataArray,20)
            for(let i=0;i<desviaciones.length;i++){
                ctx.lineTo(i/desviaciones.length*TAMANIO_GRAFICO,TAMANIO_GRAFICO-(promedios[i]+2.5*desviaciones[i])/256*TAMANIO_GRAFICO);
            }
            ctx.stroke();


            return <span></span>

}