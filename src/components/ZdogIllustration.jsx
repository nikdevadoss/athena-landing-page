// src/components/ZdogIllustration.jsx
import React, { useEffect, useRef } from 'react';
import Zdog from 'zdog';

const ZdogIllustration = () => {
    const canvasRef = useRef();

    useEffect(() => {
        let isSpinning = true;

        const illo = new Zdog.Illustration({
            element: canvasRef.current,
            dragRotate: true,
            onDragStart: () => {
                isSpinning = false;
            },
            onDragEnd: () => {
                isSpinning = true;
            },
        });

        // // Add a circle
        // new Zdog.Ellipse({
        //     addTo: illo,
        //     diameter: 80,
        //     stroke: 20,
        //     color: '#636',
        // });

        // function animate() {
        //     if (isSpinning) {
        //         illo.rotate.y += 0.03;
        //     }
        //     illo.updateRenderGraph();
        //     requestAnimationFrame(animate);
        // }

        // animate();

        // return () => {
        //     isSpinning = false;
        // };

        const circleCount = 5;
        const anchorPoints = [];
        const circleMove = [];
        const radius = 180;
        const speed = 0.02;

        // Create anchor points in a circular path
        for (let i = 0; i < circleCount; i++) {
            const angle = (Zdog.TAU / circleCount) * i;
            anchorPoints[i] = new Zdog.Anchor({
                addTo: illo,
                translate: { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius }
            });
        }

        // Create circles and lines connecting them
        anchorPoints.forEach((anchor, i) => {
            new Zdog.Ellipse({
                addTo: anchor,
                diameter: 20,
                stroke: 4,
                color: i % 2 === 0 ? '#000' : '#FFF',
            });

            new Zdog.Shape({
                addTo: illo,
                path: [{}, { arc: [
                    { x: anchor.translate.x * 0.5, y: anchor.translate.y * 0.5 },
                    { x: anchorPoints[(i + 1) % circleCount].translate.x, y: anchorPoints[(i + 1) % circleCount].translate.y }
                ]}],
                stroke: 2,
                color: '#000',
            });

            // Object to control movement
            circleMove[i] = { angle: (Zdog.TAU / circleCount) * i, anchor };
        });

        function animate() {
            circleMove.forEach(item => {
                item.angle += speed;
                item.anchor.translate.x = Math.cos(item.angle) * radius;
                item.anchor.translate.y = Math.sin(item.angle) * radius;
            });
            illo.updateRenderGraph();
            requestAnimationFrame(animate);
        }

        animate();

        return () => illo.children.forEach(child => child.remove());
    }, []);

    return <canvas ref={canvasRef} width="500" height="500"></canvas>;
};

export default ZdogIllustration;