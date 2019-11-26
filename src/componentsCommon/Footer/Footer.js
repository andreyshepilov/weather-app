import React from 'react';

import styles from './Footer.module.scss';

function Footer() {
  return (
    <footer className={styles.rootWrapper}>
      <div className={styles.rights}>
        <div>
          Icons made by{' '}
          <a href='https://www.flaticon.com/authors/freepik' title='Freepik'>
            Freepik
          </a>{' '}
          from{' '}
          <a href='https://www.flaticon.com/' title='Flaticon'>
            www.flaticon.com
          </a>
        </div>
        <div>
          Icons made by{' '}
          <a
            href='https://www.flaticon.com/authors/swifticons'
            title='Swifticons'
          >
            Swifticons
          </a>{' '}
          from {/* // TODO */}
          <a href='https://www.flaticon.com/' title='Flaticon'>
            www.flaticon.com
          </a>
        </div>
        <div>
          Image by{' '}
          <a href='https://pixabay.com/users/PublicDomainPictures-14/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=316579'>
            PublicDomainPictures
          </a>{' '}
          from{' '}
          <a href='https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=316579'>
            Pixabay
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
