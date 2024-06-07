import { defer } from '@shopify/remix-oxygen';
import { Await, useLoaderData, Link } from '@remix-run/react';
import { Suspense } from 'react';
import { Image, Money } from '@shopify/hydrogen';

export const meta = () => {
    return [{ title: 'Warme | Productos' }];
};

export async function loader(args) {
    // Start fetching non-critical data without blocking time to first byte
    const deferredData = loadDeferredData(args);

    // Await the critical data required to render initial state of the page
    const criticalData = await loadCriticalData(args);

    return defer({ ...deferredData, ...criticalData });
}

async function loadCriticalData({ context }) {
    const [{ collections }] = await Promise.all([
        context.storefront.query(FEATURED_COLLECTION_QUERY),
        // Add other queries here, so that they are loaded in parallel
    ]);

    return {
        featuredCollection: collections.nodes[0],
    };
}

function loadDeferredData({ context }) {
    const recommendedProducts = context.storefront
        .query(RECOMMENDED_PRODUCTS_QUERY)
        .catch((error) => {
            // Log query errors, but don't throw them so the page can still render
            console.error(error);
            return null;
        });

    return {
        recommendedProducts,
    };
}

function RecommendedProducts({ products }) {
    return (
        <div className="recommended-products">
            <h2>Recommended Products</h2>
            <Suspense fallback={<div>Loading...</div>}>
                <Await resolve={products}>
                    {(response) => (
                        <div className="recommended-products-grid">
                            {response
                                ? response.products.nodes.map((product) => (
                                    <Link
                                        key={product.id}
                                        className="recommended-product"
                                        to={`/products/${product.handle}`}
                                    >
                                        <Image
                                            data={product.images.nodes[0]}
                                            aspectRatio="1/1"
                                            sizes="(min-width: 45em) 20vw, 50vw"
                                        />
                                        <h4>{product.title}</h4>
                                        <small>
                                            <Money data={product.priceRange.minVariantPrice} />
                                        </small>
                                    </Link>
                                ))
                                : null}
                        </div>
                    )}
                </Await>
            </Suspense>
            <br />
        </div>
    );
}

export default function ProductPage() {
    /** @type {LoaderReturnData} */
    const data = useLoaderData();
    return (
        <div>
            <RecommendedProducts products={data.recommendedProducts} />
        </div>
    );
}




const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 1) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
`;

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
`;

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('storefrontapi.generated').FeaturedCollectionFragment} FeaturedCollectionFragment */
/** @typedef {import('storefrontapi.generated').RecommendedProductsQuery} RecommendedProductsQuery */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
