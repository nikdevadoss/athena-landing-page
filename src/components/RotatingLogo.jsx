// src/components/RotatingLogo.jsx
import React, { useEffect, useRef } from 'react';
import Zdog from 'zdog';

const RotatingLogo = () => {
  const illustrationRef = useRef();

  useEffect(() => {
    const illo = new Zdog.Illustration({
      element: illustrationRef.current,
      dragRotate: true,
    });

    // Function to create a ring semicircle
    const createRing = (diameter, translateZ, color, rotateZ, quarters) => {
        const ring = new Zdog.Anchor({
          addTo: illo,
          translate: { z: translateZ },
          rotate: { z: rotateZ },
        });
  
        new Zdog.Ellipse({
          addTo: ring,
          diameter: diameter,
          quarters: quarters, // Only half of the ellipse is drawn
          stroke: 10,
          color: color,
          closed: false,
          fill: false,
        });
  
        return ring;
      };

    // Create center sphere
    new Zdog.Shape({
      addTo: illo,
      stroke: 30,
      color: '#000',
      translate: { z: 40 },
    });

    // Create semicircular rings
    const ring1 = createRing(100, 0, '#000', Zdog.TAU / 4, 2);
    const ring2 = createRing(200, -40, '#000', Zdog.TAU * 3 / 4, 4);
    const ring3 = createRing(300, -80, '#000', Zdog.TAU * 5, 2);
    const ring4 = createRing(400, -120, '#000', Zdog.TAU / 4, 3);

    // const ring5 = createRing(200, 40, '#000', Zdog.TAU * 3 / 4, 3);
    // const ring6 = createRing(300, 80, '#000', Zdog.TAU * 5, 2);
    // const ring7 = createRing(100, 0, '#000', Zdog.TAU / 4, 2);

    function animate() {
      // Rotate the whole illustration on the Y-axis
      illo.rotate.y += 0.004;

      // Rotate each ring on its Z-axis
      ring1.rotate.z += 0.05;
      ring2.rotate.z -= 0.01;
      ring3.rotate.z += 0.01;
      ring4.rotate.z += 0.01;

    //   ring5.rotate.z += 0.01;
    //   ring6.rotate.z += 0.01;
    //   ring7.rotate.z += 0.02;

      illo.updateRenderGraph();
      requestAnimationFrame(animate);
    }

    animate();

    return () => illo.children.forEach(child => child.remove());
  }, []);

  return <canvas ref={illustrationRef} width="500" height="500" />;
};

export default RotatingLogo;
