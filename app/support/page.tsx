import Image from 'next/image';

const SupportPage = () => {
  return (
    <>
      <div>
        <h1>Support Page</h1>

        <a href="https://ko-fi.com/U7U0168HCE" target="_blank">
          <Image
            height="500"
            width={200}
            src="https://storage.ko-fi.com/cdn/kofi6.png?v=6"
            alt="Buy Me a Coffee at ko-fi.com"
          />
        </a>
      </div>
    </>
  );
};

export default SupportPage;
