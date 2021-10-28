import Link from 'next/link';
import styles from './styles.module.scss';
import PropTypes from 'prop-types';

const FacebookIconLink = ({ link }) => {
  return (
    <div className={styles.container}>
      <Link href={link || ''}>
        <a rel="noreferrer noopener" target={'_blank'}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 512 512"
            id="Layer_1"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M480,257.35c0-123.7-100.3-224-224-224s-224,100.3-224,224c0,111.8,81.9,204.47,189,221.29V322.12H164.11V257.35H221V208c0-56.13,33.45-87.16,84.61-87.16,24.51,0,50.15,4.38,50.15,4.38v55.13H327.5c-27.81,0-36.51,17.26-36.51,35v42h62.12l-9.92,64.77H291V478.66C398.1,461.85,480,369.18,480,257.35Z"
              fillRule="evenodd"
              className={styles.icon}
            />
          </svg>
        </a>
      </Link>
    </div>
  );
};

FacebookIconLink.propTypes = {
  link: PropTypes.string.isRequired,
};

export default FacebookIconLink;