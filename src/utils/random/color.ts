/**
 * 生成指定 HSL 范围内的随机颜色（支持多范围和空参数）
 * @param hueRanges 色相范围数组，如 [[0, 30], [180, 240]]（0-360），为空时使用默认范围
 * @param saturationRanges 饱和度范围数组，如 [[50, 70], [80, 100]]（0-100），为空时使用默认范围
 * @param lightnessRanges 亮度范围数组，如 [[30, 50], [70, 90]]（0-100），为空时使用默认范围
 * @returns 十六进制颜色字符串，如 "#FF0000"
 */
export function generateRandomColorInRanges(
  hueRanges?: [number, number][] | null,
  saturationRanges?: [number, number][] | null,
  lightnessRanges?: [number, number][] | null
): string {
  // 默认范围
  const defaultHueRanges: [number, number][] = [[0, 360]];
  const defaultSaturationRanges: [number, number][] = [[50, 100]];
  const defaultLightnessRanges: [number, number][] = [[30, 70]];

  // 处理空参数，使用默认值
  const effectiveHueRanges = hueRanges && hueRanges.length > 0 ? hueRanges : defaultHueRanges;
  const effectiveSaturationRanges = saturationRanges && saturationRanges.length > 0 ? saturationRanges : defaultSaturationRanges;
  const effectiveLightnessRanges = lightnessRanges && lightnessRanges.length > 0 ? lightnessRanges : defaultLightnessRanges;

  // 从多个范围中随机选择一个范围
  const getRandomValueFromRanges = (ranges: [number, number][]) => {
    // 随机选择一个范围
    const range = ranges[Math.floor(Math.random() * ranges.length)];
    // 在该范围内生成随机值
    return Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0];
  };

  // 生成随机 HSL 值
  const hue = getRandomValueFromRanges(effectiveHueRanges);
  const saturation = getRandomValueFromRanges(effectiveSaturationRanges);
  const lightness = getRandomValueFromRanges(effectiveLightnessRanges);

  // 将 HSL 转换为十六进制
  return hslToHex(hue, saturation, lightness);
}

/**
 * 将 HSL 颜色值转换为十六进制
 * @param h 色相 (0-360)
 * @param s 饱和度 (0-100)
 * @param l 亮度 (0-100)
 * @returns 十六进制颜色字符串
 */
function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }

  // 将 RGB 值转换为十六进制
  const toHex = (value: number) => {
    const hex = Math.round((value + m) * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}
