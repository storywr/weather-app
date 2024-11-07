const LoadingCarousel = () => {
  return (
    <div className="flex flex-row gap-2">
      <div className="skeleton h-[332px] min-w-[310px]" />
      <div className="divider divider-horizontal divider-neutral !h-[332px]" />
      <div className="carousel rounded-box space-x-2">
        {Array(20)
          .fill(undefined)
          .map((_skeleton, idx) => (
            <div
              key={idx}
              className="carousel-item skeleton h-[332px] w-[310px]"
            />
          ))}
      </div>
    </div>
  );
};

export default LoadingCarousel;
