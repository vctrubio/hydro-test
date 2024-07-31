import { Suspense, useState } from 'react';
import { Await, NavLink } from '@remix-run/react';
import { useAnalytics } from '@shopify/hydrogen';
import { useAside } from '~/components/Aside';
import logo from '~/assets/warme_logo.png';
import '../css/Header.css';

const LanguageBarrier = () => {
  return (
    <flex style={{ gap: '.2em' }}>
      <div style={{ cursor: 'pointer' }}>🇪🇸</div>
      <div style={{ cursor: 'pointer' }}>🇺🇸</div>
    </flex>
  );
};

const HeaderDropdownMenu = (primaryDomainUrl, publicStoreDomain) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className='header-burger'>
      <button className='header-menu-btn' onClick={toggleDropdown}>Menu</button>
      {isOpen && (
        <div className='header-dropdown-content'>
          {MY_MENU.items.map((item) => {
            if (!item.url) return null;

            const url =
              item.url.includes('myshopify.com') ||
              item.url.includes(publicStoreDomain) ||
              item.url.includes(primaryDomainUrl)
                ? new URL(item.url).pathname
                : item.url;
            return (
              <NavLink
                className="header-menu-dropdown-item"
                end
                key={item.id}
                onClick={() => {
                  setIsOpen(false); // Close dropdown when an item is clicked
                  closeAside(); // Assuming closeAside is a function to handle additional logic
                }}
                prefetch="intent"
                style={activeLinkStyle} // Make sure activeLinkStyle is defined
                to={url}
              >
                {item.title}
              </NavLink>
            );
          })}
        </div>
      )}
    </div>
  );
}

/**
 * @param {HeaderProps}
 */
export function Header({ header, isLoggedIn, cart, publicStoreDomain }) {
  const { shop, menu } = header;

  return (
    <header className="header">
      <NavLink prefetch="intent" to="/" style={activeLinkStyle} end>
        <img src={logo} alt="Warme" style={{ width: 100}} />
      </NavLink>
      <HeaderDropdownMenu
        menu={menu}
        primaryDomainUrl={header.shop.primaryDomain.url}
        publicStoreDomain={publicStoreDomain}
      />
      <HeaderMenu
        menu={menu}
        viewport="desktop"
        primaryDomainUrl={header.shop.primaryDomain.url}
        publicStoreDomain={publicStoreDomain}
      />
      <div className='header-hide'></div>
    </header>
  );
}

/**
 * @param {{
 *   menu: HeaderProps['header']['menu'];
 *   primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url'];
 *   viewport: Viewport;
 *   publicStoreDomain: HeaderProps['publicStoreDomain'];
 * }}
 */
export function HeaderMenu({
  menu,
  primaryDomainUrl,
  viewport,
  publicStoreDomain,
}) {
  // const className = `header-menu-${viewport}`;
  const className = `header-menu-`;

  function closeAside(event) {
    if (viewport === 'mobile') {
      event.preventDefault();
      window.location.href = event.currentTarget.href;
    }
  }

  return (
    <div className="header-menu-" role="navigation">
      {MY_MENU.items.map((item) => {
        if (!item.url) return null;

        const url =
          item.url.includes('myshopify.com') ||
            item.url.includes(publicStoreDomain) ||
            item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        return (
          <NavLink
            className="header-menu-item"
            end
            key={item.id}
            onClick={closeAside}
            prefetch="intent"
            style={activeLinkStyle}
            to={url}
          >
            {item.title}
          </NavLink>
        );
      })}
    </div>
  );
}

/**
 * @param {Pick<HeaderProps, 'isLoggedIn' | 'cart'>}
 */
function HeaderCtas({ isLoggedIn, cart }) {
  return (
    <nav className="header-ctas" role="navigation">
      <HeaderMenuMobileToggle />
      <NavLink prefetch="intent" to="/account" style={activeLinkStyle}>
        <Suspense fallback="Sign in">
          <Await resolve={isLoggedIn} errorElement="Sign in">
            {(isLoggedIn) => (isLoggedIn ? 'Account' : 'Sign in')}
          </Await>
        </Suspense>
      </NavLink>
      <SearchToggle />
      <CartToggle cart={cart} />
    </nav>
  );
}

function HeaderMenuMobileToggle() {
  const { open } = useAside();
  return (
    <button
      className="header-menu-mobile-toggle reset"
      onClick={() => open('mobile')}
    >
      <h3>☰</h3>
    </button>
  );
}

function SearchToggle() {
  const { open } = useAside();
  return (
    <button className="reset" onClick={() => open('search')}>
      Search
    </button>
  );
}

/**
 * @param {{count: number}}
 */
function CartBadge({ count }) {
  const { open } = useAside();
  const { publish, shop, cart, prevCart } = useAnalytics();

  return (
    <a
      href="/cart"
      onClick={(e) => {
        e.preventDefault();
        open('cart');
        publish('cart_viewed', {
          cart,
          prevCart,
          shop,
          url: window.location.href || '',
        });
      }}
    >
      Cart {count}
    </a>
  );
}

/**
 * @param {Pick<HeaderProps, 'cart'>}
 */
function CartToggle({ cart }) {
  return (
    <Suspense fallback={<CartBadge count={0} />}>
      <Await resolve={cart}>
        {(cart) => {
          if (!cart) return <CartBadge count={0} />;
          return <CartBadge count={cart.totalQuantity || 0} />;
        }}
      </Await>
    </Suspense>
  );
}

const MY_MENU = {
  id: 'gid://shopify/Menu/199655587897',
  items: [
    {
      id: 'gid://shopify/MenuItem/461609500729',
      resourceId: null,
      tags: [],
      title: 'Acerca',
      type: 'HTTP',
      url: '/',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609533497',
      resourceId: null,
      tags: [],
      title: 'Calculadora',
      type: 'HTTP',
      url: '/calculadora',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609566265',
      resourceId: null,
      tags: [],
      title: 'Productos',
      type: 'HTTP',
      url: '/productos',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609599033',
      resourceId: null,
      tags: [],
      title: 'Contacto',
      type: 'HTTP',
      url: '/contacto',
      items: [],
    },
  ],
};

/**
 * @param {{
 *   isActive: boolean;
 *   isPending: boolean;
 * }}
 */
function activeLinkStyle({ isActive, isPending }) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'black',
  };
}

/** @typedef {'desktop' | 'mobile'} Viewport */
/**
 * @typedef {Object} HeaderProps
 * @property {HeaderQuery} header
 * @property {Promise<CartApiQueryFragment|null>} cart
 * @property {Promise<boolean>} isLoggedIn
 * @property {string} publicStoreDomain
 */

/** @typedef {import('@shopify/hydrogen').CartViewPayload} CartViewPayload */
/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
