import { FC, ReactNode, useEffect, useRef, useState } from 'react';

const COMPONENT_MIN_HEIGHT = 300;
const COMPONENT_SUB_HEIGHT = 90;

interface IFitContentProp {
    children: (height: number) => ReactNode;
}

const FitContent: FC<IFitContentProp> = (prop: IFitContentProp) => {
    const { children } = prop || {};

    const ref = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(COMPONENT_MIN_HEIGHT);

    useEffect(() => {
        // Handler to call on window resize
        const handleResize = _.debounce(() => {
            if (ref && ref.current) {
                setHeight(Math.max(window.innerHeight - COMPONENT_SUB_HEIGHT, 0));
            }
        }, 10);
        // Add event listener
        window.addEventListener('resize', handleResize);
        // Call handler right away so state gets updated with initial window size
        handleResize();
        // Remove event listener on cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, [ref]);

    return (
        <div ref={ref} className="fit-content">
            {children && children(height)}
        </div>
    );
};

export default FitContent;
