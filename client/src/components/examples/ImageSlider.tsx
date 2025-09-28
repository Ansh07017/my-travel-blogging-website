import ImageSlider from '../ImageSlider';

export default function ImageSliderExample() {
  return (
    <div className="p-8 bg-background">
      <h2 className="text-2xl font-bold mb-6 text-center">Fixed Image Slider - No Overlapping</h2>
      <ImageSlider autoplay={true} autoplayDelay={3000} />
      <p className="text-center text-muted-foreground mt-4">
        Images now transition smoothly without overlapping issues
      </p>
    </div>
  );
}