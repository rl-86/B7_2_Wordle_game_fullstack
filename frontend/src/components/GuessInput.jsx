export default function GuessInput(props) {
  return (
    <div>
      <input type='text' value={props.guess} onChange={props.onGuessChange} />
    </div>
  );
}
