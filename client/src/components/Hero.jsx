import React from "react";

const Hero = () => {
  return (
    <section className="h-[calc(100vh-64px)] bg-[url(/hero-bg.jpg)] bg-cover bg-center bg-no-repeat">
      <div className="from-dark-900/90 to-dark-900/70 h-full w-full bg-gradient-to-br">
        <div className="container flex h-full flex-col items-center justify-center text-center ">
          <h2 className="mb-4 text-3xl font-semibold text-white sm:text-4xl md:mb-6 md:text-5xl">
            Welcome to Our <span className="text-primary">Shop</span>
          </h2>
          <p className="max-w-sm text-base text-white/90 sm:max-w-lg sm:text-lg md:max-w-2xl md:text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
            dolores ad veniam dolorum molestiae ducimus.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
