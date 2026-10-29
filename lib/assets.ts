const asset = (fileName: string) => `/assets/${fileName}`;

/**
 * Semantic paths for the original image payloads extracted from the Figma file.
 * Keep the hashes here so components never need to know the archive filenames.
 */
export const ASSETS = {
  logo: asset("9ec80305a487911b3718899bd05a058d7273641b.png"),
  /** Stand-in for any image slot of a draft entry that has not been supplied yet (dev only). */
  placeholder: asset("placeholder.svg"),

  homeHeroAnimation: asset("632f5756c2d6fb41564d93cb5a398dc4290e9f51.gif"),
  homeHeroAnimated: asset("632f5756c2d6fb41564d93cb5a398dc4290e9f51.gif"),
  homeHeroStill: asset("c51e6941e7c11e7aa8f26c5af37c910e89289350.png"),
  homeHeroLoop: asset("home-hero-loop.mp4"),
  homeHeroPoster: asset("home-hero-poster.jpg"),
  mountainBackdrop: asset("79ccd6a9922709ac5bb6df4c9e199004cf7f8631.jpg"),
  whyUsBackground: asset("79ccd6a9922709ac5bb6df4c9e199004cf7f8631.jpg"),

  ctaBackdrop: asset("9abd5e2bbc22eb7f25dacaa8fbfb530c1ec05a2f.jpg"),
  footerAnimation: asset("347c615881b659a74d52e560d6c00089e2b701d4.gif"),
  footerStill: asset("6b5fb31731d5f3618f25467b52a4bbe7b3b4302b.png"),

  workSaas: asset("274b8a74bd7eebb23398c9719b7084007b6c63a3.png"),
  workSaasDetail: asset("514bd391c78774431623894e0dbb489a4561cb41.png"),
  workAiProduct: asset("work-ai-product-desktop.png"),
  workAiProductBackdrop: asset("035a93c42ff7801e5883795cf57c30cbc503dfae.jpg"),
  workStaffAugmentation: asset("05f9c70846494e19c5524a8248247a0f69a13ee3.png"),
  clinuvelWordmark: asset("f527bdad68666e3070d51d20b9220c63ce6b2e5f.png"),
  apricotWordmark: asset("f26c1ddff97a689cf01fccdbded4219665b4909e.png"),

  processUnderstand: asset("fb4e932b0360733d77232dbd88c44270c4c4b391.jpg"),
  processBuild: asset("08a50e8844c73fcc8ac61e42df61f2ad40cc604d.jpg"),
  processScale: asset("d13ff756d30d7382cb5eb5bc95c0bdd2a0c73b66.jpg"),

  testimonialCristin: asset("292d49194ea7e439e26840787f1af9ad30e49c38.png"),
  testimonialSimon: asset("0b4eac023300852ec056cb78b4832a23d3a3b28e.png"),
  testimonialWoman: asset("292d49194ea7e439e26840787f1af9ad30e49c38.png"),
  testimonialMan: asset("0b4eac023300852ec056cb78b4832a23d3a3b28e.png"),
  testimonialPortrait: asset("27d5d4965dfa0b5b8fdd9d7a494f19d2439c73cc.png"),
  testimonialVelaGrid: asset("testimonial-velagrid.png"),
  testimonialNovaline: asset("testimonial-novaline.png"),

  aboutHero: asset("64b4ec77d2a64f24801b170edd3a4e55f58c4b00.jpg"),
  aboutApproach: asset("9b358afee638bd9f99888643310a6e7c6dec1552.jpg"),
  aboutResults: asset("507052140b2e1fe8b6a05f6eb71ebe1ff324f85f.jpg"),
  aboutAchievements: asset("e920f9e683fedfe8abcce6238e933570e9b41521.jpg"),
  aboutTestimonial: asset("fda8e4c4e1e5d2e2962f1ab6fc3d934dd3464c3e.png"),
  aboutPortrait: asset("fda8e4c4e1e5d2e2962f1ab6fc3d934dd3464c3e.png"),
  teamMaya: asset("team-maya-chen.png"),
  teamOmar: asset("team-omar-haddad.png"),
  teamAmara: asset("team-amara-okafor.png"),

  serviceWorkflow: asset("9c51724a96b63b941697308378ddf2d9d8631050.jpg"),
  serviceAi: asset("9502786cb03a23835111f2c8207a35fb5230a2a5.jpg"),
  serviceRevenue: asset("d420e76e1f6983b9d2249dd156016d4d5644567e.jpg"),

  blogRobot: asset("83d8228ffb5ea4184bed0ab50abde87b2b951575.jpg"),
  blogGlasses: asset("fba3e691fc110b26d5f7877bccbceb5d57b73937.png"),
  blogLaptop: asset("d0b98b006c2260cf1b6a61ee3865ed982bece85c.png"),
  blogArticleHero: asset("68ae227c4e1a059c97c4078128e35d56659f178a.jpg"),
  articleHero: asset("68ae227c4e1a059c97c4078128e35d56659f178a.jpg"),

  caseStudyHero: asset("e5f3713631911c5b33de2289fca072f1c32de503.png"),
  caseStudyHeroBackdrop: asset("be1b36ae64b1f6df8c21a79dd1028b1e86ca87b1.jpg"),
  caseStudyApproach: asset("018a63791229b8dfc051915224638934c4ff21de.png"),
  caseStudyResults: asset("1c5e30447e7e4179eacc8e0f6264a7aed7d62a42.png"),
  caseStudyResultsBackdrop: asset("a1326d370df5580f5a32fbb700a8d27f230f74e6.jpg"),
  relatedProjectMandala: asset("729dfc7273b99b4a302c2a7b00bf9cec8cb81616.jpg"),
  relatedProjectPandawa: asset("0ed7d84605fd4870afd285a2dcd0b9fff5b52c3a.jpg"),

  // Compatibility aliases used by route-level compositions.
  workOne: asset("274b8a74bd7eebb23398c9719b7084007b6c63a3.png"),
  workThree: asset("05f9c70846494e19c5524a8248247a0f69a13ee3.png"),
  clinuvelLogo: asset("f527bdad68666e3070d51d20b9220c63ce6b2e5f.png"),
  caseHero: asset("e5f3713631911c5b33de2289fca072f1c32de503.png"),
  caseChallengeBackground: asset("83d8228ffb5ea4184bed0ab50abde87b2b951575.jpg"),
  caseApproach: asset("018a63791229b8dfc051915224638934c4ff21de.png"),
  caseResults: asset("1c5e30447e7e4179eacc8e0f6264a7aed7d62a42.png"),
} as const;

export type AssetKey = keyof typeof ASSETS;
