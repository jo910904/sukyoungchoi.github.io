# Motion specification

This specification supplements the static desktop, tablet, and mobile frames in `homepage.pen`.
Motion is intentionally quiet so the academic content remains the focus.

| Element | Initial state | Resting state | Trigger and timing |
| --- | --- | --- | --- |
| Hero copy | 65% opacity, 6px lower | Full opacity, original position | Once on page load, 360ms |
| Hero illustration frame | 8px lower | Original position | Once on page load, 440ms |
| Section navigation | Underline collapsed | Underline drawn | Hover or keyboard focus, 160ms |
| Research CTA | Original position | 2px higher; arrow 2px lower | Hover only, 160ms; focus outline stays still |
| Research and expression image buttons | Original image scale | Image scale 1.015 | Hover or keyboard focus, 180ms; captions stay visible |
| Image dialog | 8px lower, 98.5% scale, transparent | Original position and scale, opaque | Open, 180ms; native close and focus return stay immediate |
| Section headings and research cards | 92% opacity, 8px lower | Full opacity, original position | Once when 10% enters the viewport, 400ms headings / 320ms cards, no stagger |

Use the existing `site.css` and native dialog behavior. Do not add an animation
package or continuous motion. Keep content readable during page load. Use opacity
and transforms for entrance and position effects, plus a brief CTA background-color
transition. Disable these effects and smooth scrolling when
`prefers-reduced-motion: reduce` is active.
Cancel an in-progress scroll reveal if that preference becomes active.
Scroll reveal is triggered by viewport entry, not tied to scrolling distance.
Content remains fully visible until its brief animation starts; there is no
hidden waiting state or parallax movement.

References from the saved Threads archive:

- [Transitions.dev recommendation](https://www.threads.com/@promppy_com/post/Dce2a01ks9m) and its [text reveal](https://transitions.dev/transitions/texts-reveal/) and [button hover](https://transitions.dev/transitions/learn-more-hover/) examples.
- [Interaction feedback checklist](https://www.threads.com/@inner.builder/post/DU0a-0tkR-u).
- [Anime.js reference](https://www.threads.com/@sandpia_com/post/DcU9-7SgZWv) is reserved for a future, more complex timeline if one becomes necessary.

Review at 320, 390, 768, and 1440px, at 200% zoom, with keyboard and touch,
with reduced motion enabled, and while opening and closing the image dialog.
