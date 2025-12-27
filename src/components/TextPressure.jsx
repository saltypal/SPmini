import { useRef, useEffect, useState } from 'react';
import './TextPressure.css';

const TextPressure = ({
    text = 'Satya Here',
    fontFamily = 'Bricolage Grotesque',
    fontUrl = 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&display=swap',
    fontWeight = 400,
    fontSize = 'clamp(3rem, 10vw, 8rem)',
    strokeColor = '#3b82f6',
    textColor = '#ffffff',
    width = true,
    className = ''
}) => {
    const containerRef = useRef(null);
    const spansRef = useRef([]);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        if (fontUrl) {
            const link = document.createElement('link');
            link.href = fontUrl;
            link.rel = 'stylesheet';
            document.head.appendChild(link);
        }
    }, [fontUrl]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            setMousePos({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('mousemove', handleMouseMove);
            container.addEventListener('mouseenter', () => setIsHovering(true));
            container.addEventListener('mouseleave', () => setIsHovering(false));
        }

        return () => {
            if (container) {
                container.removeEventListener('mousemove', handleMouseMove);
                container.removeEventListener('mouseenter', () => setIsHovering(true));
                container.removeEventListener('mouseleave', () => setIsHovering(false));
            }
        };
    }, []);

    useEffect(() => {
        const animateChars = () => {
            spansRef.current.forEach((span) => {
                if (!span) return;
                const rect = span.getBoundingClientRect();
                const containerRect = containerRef.current?.getBoundingClientRect();
                if (!containerRect) return;

                const charCenterX = rect.left - containerRect.left + rect.width / 2;
                const charCenterY = rect.top - containerRect.top + rect.height / 2;

                const dx = mousePos.x - charCenterX;
                const dy = mousePos.y - charCenterY;
                const distance = Math.sqrt(dx * dx + dy * dy);

                const maxDistance = 200;
                const minWeight = 200;
                const maxWeight = 900;
                const minWidth = 85;
                const maxWidth = 150;

                let weight = minWeight;
                let charWidth = 100;

                if (isHovering && distance < maxDistance) {
                    const normalizedDistance = 1 - distance / maxDistance;
                    weight = minWeight + (maxWeight - minWeight) * normalizedDistance;
                    if (width) {
                        charWidth = minWidth + (maxWidth - minWidth) * (1 - normalizedDistance);
                    }
                }

                span.style.fontVariationSettings = `"wght" ${weight}`;
                span.style.fontStretch = `${charWidth}%`;
            });

            requestAnimationFrame(animateChars);
        };

        const animationId = requestAnimationFrame(animateChars);
        return () => cancelAnimationFrame(animationId);
    }, [mousePos, isHovering, width]);

    const chars = text.split('');

    return (
        <div
            ref={containerRef}
            className={`text-pressure-container ${className}`}
            style={{
                fontFamily: `"${fontFamily}", sans-serif`,
                fontWeight,
                fontSize,
                WebkitTextStroke: `1px ${strokeColor}`,
                color: textColor,
                cursor: 'default'
            }}
        >
            {chars.map((char, i) => (
                <span
                    key={i}
                    ref={(el) => (spansRef.current[i] = el)}
                    className="text-pressure-char"
                    style={{
                        display: 'inline-block',
                        transition: 'font-variation-settings 0.1s ease-out, font-stretch 0.1s ease-out',
                        whiteSpace: char === ' ' ? 'pre' : 'normal'
                    }}
                >
                    {char}
                </span>
            ))}
        </div>
    );
};

export default TextPressure;
