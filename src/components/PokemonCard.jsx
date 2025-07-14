import styles from "../styles/PokemonCard.module.css";

function PokemonCard({ pokemonData: { name, typeNames, abilityNames, sprite } }) {
  return (
    <div className={styles.card}>
      <p className={styles.pokemonName}>{name}</p>
      <p className={styles.pokemonType}>{`Type: ${typeNames}`}</p>
      <p className={styles.pokemonAbility}>{`Abilities: ${abilityNames}`}</p>
      <img
        src={sprite}
        alt={`Sprite of ${name}`}
        className={styles.pokemonSprite}
      />
    </div>
  );
}

export default PokemonCard;