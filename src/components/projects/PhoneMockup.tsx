import type { PhoneScreen } from '@/types/project'
import { cn } from '@/lib/utils'

/** Display of the mock-up, in export px (iPhone 390 × 844). */
const SCREEN_HEIGHT = 844

interface PhoneMockupProps {
  screen: PhoneScreen
  /** `sizes` attribute of the screen image. */
  sizes: string
  /** Sets the phone width; its height follows. */
  className?: string
}

/**
 * iPhone mock-up around a real screen export. The export keeps its ratio: the
 * phone shows 390 × 844 of it from `offset`, and the bottom navigation bar of
 * the export (`nav`, cut from the same image) stays at the bottom of the
 * display. Every measure follows the phone width (`cqw`); the proportions
 * match scripts/phone-mockup.mjs.
 */
export function PhoneMockup({ screen, sizes, className }: PhoneMockupProps) {
  const { image, offset = 0, nav } = screen

  const picture = (alt: string, imageClass: string, top?: string) => (
    <picture>
      <source type="image/avif" srcSet={image.avif} sizes={sizes} />
      <source type="image/webp" srcSet={image.webp} sizes={sizes} />
      <img
        src={image.src}
        width={image.width}
        height={image.height}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={cn('absolute left-0 h-auto w-full max-w-none', imageClass)}
        style={top ? { top } : undefined}
      />
    </picture>
  )

  return (
    <div className={cn('@container', className)}>
      <div className="relative rounded-[17.5cqw] bg-[linear-gradient(135deg,#f1eadf,#cfc6b8_50%,#ebe3d6)] p-[1.2cqw] shadow-float">
        {/* Side buttons */}
        <span
          aria-hidden="true"
          className="absolute top-[30cqw] -left-[0.7cqw] h-[8cqw] w-[1cqw] rounded-l-full bg-[#cfc6b8] shadow-[0_13cqw_0_#cfc6b8,0_24cqw_0_#cfc6b8]"
        />
        <span
          aria-hidden="true"
          className="absolute top-[46cqw] -right-[0.7cqw] h-[20cqw] w-[1cqw] rounded-r-full bg-[#cfc6b8]"
        />

        <div className="relative rounded-[16.3cqw] bg-[#0b0b0b] p-[2.8cqw]">
          <div className="relative aspect-[390/844] overflow-hidden rounded-[13.5cqw] bg-[#faf7f2]">
            {picture(image.alt, 'top-0', `${(-offset / SCREEN_HEIGHT) * 100}%`)}
            {nav !== undefined && (
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 overflow-hidden"
                style={{ height: `${(nav / SCREEN_HEIGHT) * 100}%` }}
              >
                {picture('', 'bottom-0')}
              </div>
            )}
          </div>
          {/* Notch */}
          <span
            aria-hidden="true"
            className="absolute top-[2.7cqw] left-1/2 h-[7.1cqw] w-[40cqw] -translate-x-1/2 rounded-b-[3.6cqw] bg-[#0b0b0b]"
          />
        </div>
      </div>
    </div>
  )
}
