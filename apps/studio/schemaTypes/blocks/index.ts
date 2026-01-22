import { cta } from "@/schemaTypes/blocks/cta";
import { faqAccordion } from "@/schemaTypes/blocks/faq-accordion";
import { featureCardsIcon } from "@/schemaTypes/blocks/feature-cards-icon";
import { hero } from "@/schemaTypes/blocks/hero";
import { imageLinkCards } from "@/schemaTypes/blocks/image-link-cards";
import { subscribeNewsletter } from "@/schemaTypes/blocks/subscribe-newsletter";
import { featureSection } from "@/schemaTypes/blocks/feature-section";
import { ourLatestSection } from "@/schemaTypes/blocks/our-latest-section";
import { simpleHero } from "@/schemaTypes/blocks/hero-section";


export const pageBuilderBlocks = [
  simpleHero,
  hero,
  cta,
  featureCardsIcon,
  featureSection,
  ourLatestSection,
  faqAccordion,
  imageLinkCards,
  subscribeNewsletter,
];
