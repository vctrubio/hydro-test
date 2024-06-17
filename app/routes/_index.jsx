import {defer} from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link} from '@remix-run/react';
import {Suspense} from 'react';
import {Image, Money} from '@shopify/hydrogen';
import { BannerDesc, BannerPhoto } from '~/components/Banners';
import { Calculator } from '~/components/Calculator';
import { ContactForm } from '~/components/ContactForm';
import Faq from '~/components/Faq';
import { RenderProposal } from '~/components/RenderProposal';

export const meta = () => {
  return [{title: 'Warme'}];
};


export async function loader(args) {
  return null;
}

export default function Homepage() {
  return (
    <div style={{width: '100vw'}}>
      <BannerPhoto/>
      <BannerDesc/>
      <Calculator/>
      {/* <RenderProposal/> */}
      {/* <ContactForm/> */}
      <Faq/>
    </div>
  );
}
