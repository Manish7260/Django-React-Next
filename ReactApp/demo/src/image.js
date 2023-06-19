function Image() {
    return (
      <img
        src="https://i.imgur.com/ZF6s192.jpg"
        alt="'Floralis Genérica' by Eduardo Catalano: a gigantic metallic flower sculpture with reflective petals"
      />
    );
  }

  export default function Gallery()
  {
    return (
        <section>
            <h1>Inspiring Sculpture</h1>
        <Image />
        <Image />
        <Image />
        </section>
    );
  }