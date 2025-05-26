import { RainbowButton } from "@/components/ui/rainbowbutton";
import Link from "next/link";
import { motion } from "framer-motion";

const AnimatedGradientText = ({ text }: { text: string }) => {
  return (
    <motion.span
      className="inline-block bg-clip-text text-transparent py-1 leading-tight"
      animate={{
        backgroundImage: [
          "linear-gradient(to right, #c471ed, #f64f59, #c471ed)", // Purple, Red, Purple
          "linear-gradient(to right, #f64f59, #c471ed, #f64f59)", // Red, Purple, Red
        ],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "linear",
      }}
      style={{
        backgroundSize: "300% auto",
        display: "inline-block",
        lineHeight: "1.2",
      }}
    >
      {text}
    </motion.span>
  );
};

interface HeroProps {
  name: string;
  title: string;
  description: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  demoLinkText: string;
  demoLinkHref: string;
  calLink?: string;
}

const Hero = ({
  name,
  title,
  description,
  primaryButtonText,
  secondaryButtonText,
  demoLinkText,
  demoLinkHref,
  calLink,
}: HeroProps) => {
  return (
    <section className="pt-48 pb-20 bg-gray-50 dark:bg-midnight">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 text-gray-900 dark:text-white ">
            Hello, I&apos;m <AnimatedGradientText text={name} />
            <span className="block text-2xl md:text-3xl mt-2 text-gray-600 dark:text-gray-300">{title}</span>
          </h1>
          <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-8">
            {description}
          </p>
          <div className="flex justify-center gap-4">
            {calLink ? (
              <Link href={calLink} target="_blank" rel="noopener noreferrer">
                <RainbowButton
                  variant="default"
                  size="lg"
                >
                  {primaryButtonText}
                </RainbowButton>
              </Link>
            ) : (
              <RainbowButton
                variant="default"
                size="lg"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {primaryButtonText}
              </RainbowButton>
            )}
            
            <RainbowButton
              variant="default"
              size="lg"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {secondaryButtonText}
            </RainbowButton>
          </div>
          
          <div className="mt-8 text-center">
            <Link href={demoLinkHref} className="text-blue-500 hover:underline">
              {demoLinkText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 