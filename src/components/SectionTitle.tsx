import React from 'react';
import '../styles/index.css';

/**
 * Интерфейс для пропсов SectionTitle.
 * @interface SectionTitleProps
 * @property {string} titleText - Заголовок секции.
 * @property {string} [className] - Необязательный CSS-класс, применяемый к заголовку.
 */
interface SectionTitleProps {
  titleText: string;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ titleText, className }) => {
  return (
    <h2 className={className || ''}> 
      {titleText}
    </h2>
  );
};

export default SectionTitle;