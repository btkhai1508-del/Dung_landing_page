// Phát hiện tab ẩn danh / riêng tư (không có cách chính thức, dựa trên dấu hiệu của từng trình duyệt).
// Trình duyệt trong app (Facebook, Zalo, Instagram...) bỏ qua để tránh chặn nhầm người dùng thật.

const IN_APP = /FBAN|FBAV|FB_IAB|Instagram|Zalo|Line\/|TikTok|musical_ly|Messenger/i;

function storageWorks(): boolean {
  try {
    const k = '__dgh_test__';
    localStorage.setItem(k, '1');
    localStorage.removeItem(k);
    return true;
  } catch {
    return false;
  }
}

export async function isPrivateMode(): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  // Không lưu được dữ liệu thì cũng không giới hạn "1 lần" được → coi như ẩn danh
  if (!storageWorks()) return true;
  const ua = navigator.userAgent;
  if (IN_APP.test(ua)) return false;

  // Trên iPhone/iPad mọi trình duyệt đều dùng nhân Safari (WebKit)
  const isIOS = /iPhone|iPad|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isFirefox = !isIOS && /Firefox/.test(ua);
  const isChromium = !isIOS && !isFirefox && /Chrome|Chromium|Edg\//.test(ua);
  const isSafari = isIOS || (/Safari/.test(ua) && !isChromium && !isFirefox);

  // Chrome/Edge trên Android & máy tính: KHÔNG dò được ẩn danh một cách đáng tin
  // (cách đo dung lượng lưu trữ hay chặn nhầm máy còn ít bộ nhớ), nên không chặn.
  if (isChromium) return false;

  try {
    if ((isFirefox || isSafari) && navigator.storage?.getDirectory) {
      // Firefox & Safari (mọi trình duyệt trên iPhone) chặn bộ nhớ tệp riêng (OPFS) trong chế độ riêng tư
      await navigator.storage.getDirectory();
      return false;
    }
  } catch {
    return true;
  }
  return false;
}
