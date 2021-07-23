import PropTypes from 'prop-types';
import { useState } from 'react';
import styles from './SizeSelector.module.scss';

const SizeSelector = ({
  keyName,
  fullSizeList,
  availableSizeList,
  ...rest
}) => {

  let tags = [];
  const [selectedTag, setSelectedTag] = useState('');

  function onSelect(tag) {
    setSelectedTag(tag);
  }

  fullSizeList.forEach(element => {
    let key;
    if (!!keyName) key = keyName + '_' + element.name;
    else key = element.name;

    if (availableSizeList.some((size) => size.value === element.value)) {
      tags.push(
        <div
          key={key}
          className={[
            styles.tag,
            styles.abled,
            element.name === selectedTag && styles.selected,
          ]
            .join(' ')
            .trim()}
            onClick={onSelect.bind(this, element.value)}
        >
          {element.name}
        </div>
      );
    } else {
      tags.push(
        <div
          key={key}
          className={[styles.tag, styles.disabled].join(' ').trim()}
        >
          {element.name}
        </div>
      );
    }
  });

  return (
    <>
      <div className={styles.tagsContainer} {...rest}>
        {tags}
      </div>
    </>
  );
};

SizeSelector.propTypes = {
  fullSizeList: PropTypes.array,
  availableSizeList: PropTypes.array,
};

export default SizeSelector;
