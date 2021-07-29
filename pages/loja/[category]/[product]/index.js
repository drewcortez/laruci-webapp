import React, { useContext, useRef, useState } from 'react';
import { useRouter } from "next/router";
import Head from 'next/Head';
import Breadcrumb from '../../../../components/Breadcrumb';
import ShipmentCalc from '../../../../components/ShipmentCalc';
import Button from '../../../../components/utilities/Button';
import ImageShow from '../../../../components/utilities/ImageShow';
import SizeSelector from '../../../../components/utilities/SizeSelector';
import ProductList from '../../../../components/ProductList';
import styles from '../../../../styles/ProductPage.module.scss';
import {
  Input,
  InputNumber,
} from '../../../../components/utilities/FormComponents';
import { getSizes } from '../../../../data/sizes';
import { getCategories } from '../../../../data/categories';
import {
  getBareProductListByCategory,
  getCompleteProductById,
  getBareProductListById,
} from '../../../../data/products';
import BagContext from '../../../../store/bag-context';

const optSizeNames = {
  u: 'UNIQUE',
  s: 'SPECIAL',
};

const ProductPage = ({
  title,
  canonical,
  prodId,
  prodCategory,
  allSizes,
  data,
  relatedProducts,
}) => {
  const router = useRouter();
  const product = data;
  const newPrice = !!product.discountPercent
    ? product.price * (1 - product.discountPercent / 100)
    : false;

  // INPUT OPTIONS FOR PURCHASE: - START
  // COLOR
  const [selectedColorSet, setSelectedColorSet] = useState(
    Object.keys(product.sets)[0]
  );

  // SIZE TYPE
  const [sizeType, setSizeType] = useState(optSizeNames.u);
  const onChangeSizeType = (event) => {
    setSizeType(event.target.value);
  };

  // SIZE UNIQUE
  const [sizeUnique, setSizeUnique] = useState('');
  const onChangeSizeUnique = (id, name, value) => {
    setSizeUnique({ [id]: { name: name, value: value} });
  };

  // SIZE SPECIAL
  const [sizeSpecial, setSizeSpecial] = useState();
  const onChangeSizeSpecial = (id, name, value) => {
    setSizeSpecial((sizes) => ({ ...sizes, [id]: { name: name, value: value} }));
  };

  // EXTRA OPTIONS
  const [selectedExtraOptions, setSelectedExtraOptions] = useState({});
  const onSelectedExtraOptionsHandler = (name, value) => {
    setSelectedExtraOptions((options) => ({ ...options, [name]: { name: name, value: value} }));
  };

  // QUANTITY
  const [quantity, setQuantity] = useState(1);
  const onChangeQuantity = (v) => {
    setQuantity(q => q + v);
  };
  // INPUT OPTIONS FOR PURCHASE: -END

  const [selectedColorSet_images, setSelectedColorSet_images] = useState(
    product.sets[selectedColorSet].images
  );

  function setImagesToSlideShow(color) {
    setSelectedColorSet(color);
    setSelectedColorSet_images(product.sets[color].images);
  }

  const htmlColors = Object.keys(product.sets).map((color) => (
    <div
      key={color}
      className={[
        styles.color,
        color === selectedColorSet ? styles.colorSelected : '',
      ]
        .join(' ')
        .trim()}
      style={{ backgroundColor: color }}
      onClick={setImagesToSlideShow.bind(this, color)}
    />
  ));

  function openSizesGuide() {}

  const context = useContext(BagContext);

  function addToBag(event) {
    event.preventDefault();
    const prodToBag = {
      prodId: prodId,
      name: product.name,
      color: product.sets[selectedColorSet].colorName,
      size: sizeType === optSizeNames.u ? sizeUnique : sizeSpecial,
      extraOptions: selectedExtraOptions,
      price: product.price,
      discountPercent: product.discountPercent,
      weight: product.weight,
      quantity: quantity,
      image: selectedColorSet_images[0],
    };
    context.addToBag(prodToBag);
  }

  function buyHandler(event) {
    event.preventDefault();
    addToBag(event);
    router.push({ pathname: '/loja/sacola' });
  }

  return (
    <>
      <Head>
        <title>{`${title} - ${product.name}`}</title>
        <meta
          name="description"
          content={`Tamanhos especiais: ${product.name} - ${product.shortDescription}`}
        />
        <link href={canonical} rel="canonical" />
      </Head>
      <div className={styles.contentbox}>
        <div className={styles.bredcrumb_container}>
          <Breadcrumb query={[prodCategory, prodId]} current={product.name} />
        </div>
        <div className={styles.product_content_side}>
          <div className={styles.imageshow__container}>
            <ImageShow images={selectedColorSet_images} />
          </div>
          <div className={styles.details}>
            <span className={styles.font_hightlight}>{product.name}</span>
            <section
              className={[styles.section_details, styles.details__description]
                .join(' ')
                .trim()}
            >
              {product.shortDescription}
            </section>
            <span className={styles.center_spaced_line}>
              <span className={styles.price_side}>
                {!!newPrice ? (
                  <>
                    de R$ {product.price.toFixed(2)} por{' '}
                    <span className={styles.font_price__price}>
                      R$ {newPrice.toFixed(2)}
                    </span>
                  </>
                ) : (
                  <>
                    por somente{' '}
                    <span className={styles.font_price__price}>
                      R$ {product.price.toFixed(2)}
                    </span>
                  </>
                )}
              </span>
              {!!newPrice && (
                <span
                  className={[styles.font_price__price, styles.font_discount]
                    .join(' ')
                    .trim()}
                >
                  -{product.discountPercent}%
                </span>
              )}
            </span>
            <section
              className={[styles.section_details, styles.section_colors].join(
                ' '
              )}
            >
              Cores:
              <div className={styles.imageshow__colors}>{htmlColors}</div>
            </section>
            <section
              className={[styles.section_details, styles.section_sizes].join(
                ' '
              )}
            >
              <p>
                Medidas:
                <span onClick={openSizesGuide}>Guia de medidas aqui!</span>
              </p>
              {!!product.sets[selectedColorSet].uniqueSizes && (
                <div
                  className={
                    sizeType === optSizeNames.u ? styles.selectedSizeSet : ''
                  }
                >
                  <label htmlFor="unique_size" onChange={onChangeSizeType}>
                    <Input
                      id="unique_size"
                      type="radio"
                      name="size_type"
                      value={optSizeNames.u}
                      defaultChecked={true}
                    />
                    <span>Única:</span>
                  </label>
                  <span>
                    <SizeSelector
                      keyName="uniqueSizes"
                      availableSizeList={
                        sizeType === optSizeNames.u
                          ? product.sets[selectedColorSet].uniqueSizes
                          : []
                      }
                      fullSizeList={allSizes}
                      name={'único'}
                      id={optSizeNames.u}
                      onChange={onChangeSizeUnique}
                    />
                  </span>
                </div>
              )}
              {!!product.sets[selectedColorSet].specialSizes && (
                <div
                  className={
                    sizeType === optSizeNames.s ? styles.selectedSizeSet : ''
                  }
                >
                  <label htmlFor="special_size" onChange={onChangeSizeType}>
                    <Input
                      id="special_size"
                      type="radio"
                      name="size_type"
                      value={optSizeNames.s}
                    />
                    <span>Especial:</span>
                  </label>
                  <div>
                    {product.sets[selectedColorSet].specialSizes.map((op) => (
                      <div key={op.id} className={styles.specialSizes}>
                        <span>{op.name}:</span>
                        <span>
                          <SizeSelector
                            keyName={op.id}
                            availableSizeList={
                              sizeType === optSizeNames.s ? op.sizes : []
                            }
                            fullSizeList={allSizes}
                            id={op.id}
                            name={op.name}
                            onChange={onChangeSizeSpecial}
                          />
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
            {(!!product.sets[selectedColorSet].extraOptions &&
              product.sets[selectedColorSet].extraOptions.length) > 0 && (
              <section
                className={[styles.section_details, styles.section_extras].join(
                  ' '
                )}
              >
                <p>Opções:</p>
                {product.sets[selectedColorSet].extraOptions.map((op) => (
                  <div key={`extraOptDiv_${op.name}`}>
                    <span>
                      <p>{op.name}:</p>
                    </span>
                    <span>
                      {op.options.map((option) => (
                        <label
                          htmlFor={`extraOptInpt_${op.name}_${option.name}`}
                          key={`extraOptLabel_${op.name}_${option.name}`}
                          onChange={(event) =>
                            onSelectedExtraOptionsHandler(
                              op.name,
                              event.target.value
                            )
                          }
                        >
                          {option.available ? (
                            <Input
                              id={`extraOptInpt_${op.name}_${option.name}`}
                              type="radio"
                              name={`extraOptInpt_${op.name}_${op.name}`}
                              value={option.name}
                            />
                          ) : (
                            <Input
                              id={`extraOptInpt_${op.name}_${option.name}`}
                              type="radio"
                              name={`extraOptInpt_${op.name}_${op.name}`}
                              value={option.name}
                              disabled
                              tip={'Esgotado'}
                            />
                          )}
                          <span>{option.name}</span>
                        </label>
                      ))}
                    </span>
                  </div>
                ))}
              </section>
            )}
            <section
              className={[styles.section_details, styles.center_spaced_line]
                .join(' ')
                .trim()}
            >
              <p>Quantidade:</p>
              <span>
                <InputNumber
                  id="quantity"
                  name="quantity"
                  minValue={1}
                  onChange={onChangeQuantity}
                  value={quantity}
                />
              </span>
            </section>
            <section
              className={[
                styles.section_details,
                styles.section_details__buybtn,
              ]
                .join(' ')
                .trim()}
            >
              <span className={styles.section_btnline}>
                <Button
                  className={styles.section_btnline__iconbtnsize}
                  tip={'Adicionar à sacola'}
                  type="button"
                  onClick={addToBag}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    className={styles.bag_icon_plus}
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0zM8.5 8a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V12a.5.5 0 0 0 1 0v-1.5H10a.5.5 0 0 0 0-1H8.5V8z"
                    />
                  </svg>
                </Button>
                <Button
                  className={styles.section_btnline__btnsize}
                  type="button"
                  onClick={buyHandler}
                >
                  Comprar
                </Button>
              </span>
            </section>
          </div>
        </div>
        <div className={styles.product_content_bottom}>
          <section className={styles.section_details}>
            <ShipmentCalc />
          </section>
          <section
            className={[styles.section_details, styles.details__description]
              .join(' ')
              .trim()}
          >
            <span className={styles.section_title}>Descrição do Produto:</span>
            {product.longDescription}
          </section>
          <section
            className={[styles.section_details, styles.details__description]
              .join(' ')
              .trim()}
          >
            <span className={styles.section_title}>Ofertas Similares:</span>
            <ProductList
              category={prodCategory}
              list={relatedProducts}
              type="carousel"
            />
          </section>
        </div>
      </div>
    </>
  );
};

export async function getStaticPaths() {
  const categories = await getCategories();

  let pathList = [];

  for (const category of categories) {
    const products = await getBareProductListByCategory(category.id);
    for (const key in products) {
      pathList.push({ params: { category: category.id, product: key } });
    }
  }

  return {
    paths: pathList,
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const category = params.category;
  const productId = params.product;
  const sizeList = await getSizes();
  const data = await getCompleteProductById(productId);
  const relatedProducts = await getBareProductListById(data.relatedProducts);

  return {
    props: {
      title: 'Laruci',
      canonical: `http://localhost:3000/${category}/${productId}`,
      prodCategory: category,
      prodId: productId,
      allSizes: sizeList,
      data: data,
      relatedProducts: relatedProducts,
    },
  };
}

export default ProductPage;