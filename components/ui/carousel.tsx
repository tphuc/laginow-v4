import React, {
    useState,
    ReactNode,
    useContext,
    createContext,
} from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselContextProps {
    currentSlide: number;
    totalSlides: number;
    setTotalSlides: React.Dispatch<React.SetStateAction<number>>;
    setCurrentSlide: React.Dispatch<React.SetStateAction<number>>;
    slideListRef: React.RefObject<HTMLDivElement>;
    setSlideWidth: React.Dispatch<React.SetStateAction<number>>;
}

const CarouselContext = createContext<CarouselContextProps | null>(
    null,
);

export const useCarousel = () => {
    const context = useContext(CarouselContext);
    if (!context) {
        throw new Error('useCarousel must be used within a Carousel');
    }
    return context;
};

interface CarouselProps {
    children?: ReactNode;
    className?: string;
}

export const Carousel: React.FC<CarouselProps> = ({
    children,
    className,
}) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [totalSlides, setTotalSlides] = useState(0);
    const [slideWidth, setSlideWidth] = useState(0);
    const slideListRef = React.useRef<HTMLDivElement>(null);
    const sliderRef = React.useRef<HTMLSpanElement>(null);

    React.useEffect(() => {
        if (slideListRef.current) {
            slideListRef.current.scrollTo({
                left: currentSlide * slideWidth,
                behavior: 'smooth',
            });
        }
    }, [currentSlide, slideWidth]);

    const handleClick = () => {
        if (sliderRef.current) {
            sliderRef.current.focus();
        }
    };

    return (
        <CarouselContext.Provider
            value={{
                currentSlide,
                setCurrentSlide,
                slideListRef,
                totalSlides,
                setTotalSlides,
                setSlideWidth,
            }}
        >
            <div onClick={handleClick} className={cn(className)}>
                {children}
            </div>
        </CarouselContext.Provider>
    );
};

export const CarouselSlider: React.FC = () => {
    const { currentSlide, setCurrentSlide, totalSlides } =
        useCarousel();

    const handleSliderChange = (value: number[]) => {
        setCurrentSlide(value[0]);
    };

    return (
        <Slider
            min={0}
            max={totalSlides - 1}
            value={[currentSlide]}
            onValueChange={handleSliderChange}
        />
    );
};

interface CarouselButtonProps {
    children?: ReactNode;
    className?: string;
}

export const CarouselPrevious: React.FC<CarouselButtonProps> = ({
    className,
}) => {
    const { setCurrentSlide, totalSlides } = useCarousel();

    const handlePrevious = () => {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    return (
        <Button
            onClick={() => handlePrevious()}
            className={cn('absolute bg-background rounded-full z-50 left-[-14px] w-[40px] h-[40px] p-0', className)}
            variant='outline'
        >
            <ChevronLeft className='w-5 h-5' />
        </Button>
    );
};

export const CarouselNext: React.FC<CarouselButtonProps> = ({
    className,
}) => {
    const { setCurrentSlide, totalSlides } = useCarousel();

    const handleNext = () => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
    };

    return (
        <Button
            onClick={() => handleNext()}
            className={cn('absolute bg-background rounded-full z-50 right-[-14px] w-[40px] h-[40px] p-0', className)}
            variant='outline'
        >
            <ChevronRight className='w-5 h-5' />
        </Button>
    );
};

interface CarouselSlideListProps {
    children?: ReactNode;
    className?: string;
}

export const CarouselSlideList: React.FC<CarouselSlideListProps> = ({
    children,
    className,
}) => {
    const { slideListRef, setTotalSlides, setSlideWidth } =
        useCarousel();
    const totalSlides = React.Children.count(children);
    React.useEffect(() => {
        setTotalSlides(totalSlides);
        if (slideListRef.current) {
            setSlideWidth(slideListRef.current.offsetWidth);
        }
    }, [totalSlides, setTotalSlides, setSlideWidth, slideListRef]);

    return (
        <div
            ref={slideListRef}
            className={cn(
                'flex overflow-hidden snap-mandatory snap-x pointer-events-none',
                className,
            )}
        >
            {children}
        </div>
    );
};
CarouselSlideList.displayName = 'CarouselSlideList';

interface CarouselSlideProps {
    children?: ReactNode;
    className?: string;
}

export const CarouselSlide: React.FC<CarouselSlideProps> = ({
    children,
    className,
}) => {
    return (
        <div className={cn('flex-none snap-center', className)}>
            {children}
        </div>
    );
};
