// Inspired by https://github.com/joelmukuthu/animated-scroll/pull/2

const easeInOutQuad = (timeValue, start, change, duration) => {
  let time = timeValue / (duration / 2);
  if (time < 1) {
    return change / 2 * time * time + start;
  }

  time--;
  return -change / 2 * (time * (time - 2) - 1) + start;
};

/** Class representing a scrolling instance */
export default class SmoothScrollY {
  /**
   * Create an instance.
   * @param {HTMLElement} element - DOM element.
   * @param {object} options - object with options.
   */
  constructor(element, options = {}) {
    const { timeIncrement, duration, easing } = options;

    if (!element || typeof element !== 'object' || typeof element.nodeName !== 'string') {
      throw new Error('provide a DOM element');
    }

    this.element = element;

    if (timeIncrement) {
      this.timeIncrement = timeIncrement > 0 ? timeIncrement : 5;
    } else {
      this.timeIncrement = 20;
    }

    if (duration) {
      this.duration = duration > 0 ? parseInt(duration, 10) : 0;
    } else {
      this.duration = 300;
    }

    if (easing) {
      if (typeof easing !== 'function') {
        throw new Error('the easing option should be a function');
      }
      this.easing = easing;
    } else {
      this.easing = easeInOutQuad;
    }
  }

  /**
   * Scroll to offset
   * @param {number} offset - offset.
   */
  scroll(offset) {
    this.stop();
    const updatedOffset = offset > 0 ? parseFloat(offset) : 0;

    if (!this.duration) {
      this.element.scrollTop = updatedOffset;
      return;
    }

    // based on http://stackoverflow.com/a/16136789/1004406
    const start = this.element.scrollTop;
    const change = updatedOffset - start;

    let currentTime = 0;
    const animate = () => {
      currentTime += this.timeIncrement;

      this.element.scrollTop = this.easing(currentTime, start, change, this.duration);

      if (currentTime < this.duration) {
        this.raf = requestAnimationFrame(animate);
      }
    };

    animate();
  }

  /**
   * Stop scrolling
   */
  stop() {
    if (this.raf) {
      cancelAnimationFrame(this.raf);
    }
  }

  /**
   * Stop everything
   */
  destroy() {
    this.stop();
    this.raf = null;

    this.element = null;
    this.timeIncrement = null;
    this.duration = null;
    this.easing = null;
  }
}
