import Letter from './Letter';

export default function Letter({ items }) {
  return (
    <ul className='feedback'>
      {items.map((item, index) => {
        return <Letter key={index} item={item} />;
      })}
    </ul>
  );
}
