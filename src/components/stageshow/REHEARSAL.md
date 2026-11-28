# Homepage preview rehearsal

The [hero](../../features/home/hero/heroSection.component.jsx) places left-aligned copy and a two-message enquiry preview over a studio photograph. The incoming message opens the scene, the confirmation slides into place, and both messages hold. Reduced motion opens on the complete exchange.

Chrome layout checks covered 320, 390, 768, 900, 1,440, and 1,920 px. Playback checks at 390 and 1,440 px covered the confirmation and its final hold. Sampling gaps limited automated review between captured frames.

Built-in ImageGen created the [studio photo](../../assets/hero-studio.webp) from a brief for a cinematic portrait of a South Asian studio owner on the right, with an olive jacket, a timber desk, an open laptop, warm window light, and a shaded plaster wall on the left for the headline.

The [capability tiles](../../features/home/capabilities/featuresGrid.component.jsx) use one deployment window and one cropped reel timeline. The deployment completes and the playhead advances on first view. Both tiles show their completed state with reduced motion.

Chrome checks covered the desktop and 390 px playback and the 320 px reduced-motion poster. The visual gate reported no framing blockers on the final contact sheets. Automatic frame coverage was inconclusive because of sampling gaps, so separate playback checks sampled the changing SVG path and verified the final totals, complete controls, and both bento animations. The captures used a fallback font because Google Fonts was unavailable in the test environment.

The process section adapts the staged reveals from the `payout-flow` example to three independent previews. The kickoff confirms its appointment, the timeline draws three milestones in order, and a cursor publishes a site before a confirmation appears. Each scene plays once and holds its completed state. The reduced-motion view opens on that state. [Process previews](../../features/home/process/processPreviews.component.jsx)

The 390 and 1,440 px contact sheets passed the framing gate. The review led to more room around the kickoff confirmation and a simpler published button. The contact sheets had gaps between samples, so Chrome also recorded every state in order at both widths. Browser checks covered the 720 px breakpoint and the pricing link. The Chrome checks used a fallback font.
