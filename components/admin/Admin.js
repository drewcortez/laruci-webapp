import Link from 'next/link';
import { signout } from 'next-auth/client';
import styles from './Admin.module.scss';

const Admin = (props) => {
  if (!props.children) {
    return <p>Loading</p>;
  }

  return (
    <div className={styles.main}>
      <div className={styles.main_menu}>
        <ul>
          <li>
            <div className={styles.dropdown}>
              <span>Produtos</span>
              <div className={styles.dropdown_content}>
                <Link href={{ pathname: '/admin/produtos/' }} passHref>
                  <a>Produtos</a>
                </Link>
                <Link href={{ pathname: '/admin/cores/' }} passHref>
                  <a>Cores</a>
                </Link>
                <Link href={{ pathname: '/admin/tamanhos/' }} passHref>
                  <a>Tamanhos</a>
                </Link>
              </div>
            </div>
          </li>
          <li>
            <div className={styles.dropdown}>
              <span>Vendas</span>
              <div className={styles.dropdown_content}>
                <Link href={{ pathname: '/admin/banners/' }} passHref>
                  <a>Resumo</a>
                </Link>
              </div>
            </div>
          </li>
        </ul>
        <ul>
          <li>
            <span onClick={signout}>Sair</span>
          </li>
        </ul>
      </div>
      <div>{props.children}</div>
    </div>
  );
};

export default Admin;
