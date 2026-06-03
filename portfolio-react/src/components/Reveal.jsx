import { useReveal } from '../hooks/useReveal';

export default function Reveal({
  as: Tag = 'div',
  className = '',
  delay = 0,
  children,
  ...rest
}) {
  const { ref, visible } = useReveal();

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`.trim()}
      style={{ '--reveal-delay': `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
