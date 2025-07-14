import { useEffect, useRef, useState } from "react";
import PokemonCard from "./components/PokemonCard";
import styles from "./styles/App.module.css";

export default function App() {
  const [data, setData] = useState(null);
  const [pokemonName, setPokemonName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => { inputRef.current?.focus() }, []);

  async function handlePokemonName(e) {
    e.preventDefault();
    const name = pokemonName.trim().toLowerCase();
    if (!name) {
      setError("👆 Please enter a pokemon.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      if (!res.ok) throw new Error(`Could not find "${name}". Please try again.`);

      const {
        name: pokemon,
        abilities,
        sprites: { front_default: sprite },
        types,
      } = await res.json();

      setData({
        name: pokemon,
        abilityNames: abilities.map(a => a.ability.name).join(", "),
        typeNames: types.map(t => t.type.name).join(", "),
        sprite,
      });
      setError("");
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setPokemonName("");
      setIsLoading(false);
    }
  }

  return (
    <>
      <h1 className={styles.appTitle}>Pokemon Sprites</h1>
      <form
        className={styles.fetchForm}
        onSubmit={handlePokemonName}
        aria-busy={isLoading}
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter pokemon"
          value={pokemonName}
          onChange={e => {
            setPokemonName(e.target.value);
            setError("");
          }}
          aria-required="true"
        />
        <button type="submit" disabled={isLoading} aria-label="search">
          Search
        </button>
      </form>

      {error && (
        <div role="status" aria-live="polite" className={styles.message}>
          <p className={styles.errorMessage}>{error}</p>
        </div>
      )}

      {isLoading && (
        <div role="alert" className={styles.message}>
          <p className={styles.loadingMessage}>Loading...</p>
        </div>
      )}

      {data && !isLoading && <PokemonCard pokemonData={data} />}
    </>
  );
}