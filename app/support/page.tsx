import Image from "next/image";

const SupportPage = () => {
  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="my-4">
          <h1 className="text-center scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-xl">
            English
          </h1>
          <p className="leading-7 mt-2">
            <span className="font-semibold">Dear fellow flight students,</span>
            <br />
            We, Johannes and Luc from LHG2402 at the European Flight Academy,
            were recently in the same position you are probably in right
            now—preparing for our AZF/BZF exams.
            <br />
            <br /> In our opinion, no money should be demanded from students for
            such an important part of the training, and we are unaware of any
            useful, free platforms. So, we decided to take matters into our own
            hands and get to work.
            <br />
            <br /> We are really enjoying this project, but it does take a lot
            of time and some money. Therefore, we have decided to include a
            donation link, which you can find below.
            <br />
            <br /> We appreciate anything you are willing to give, and of
            course, we understand if money is tight for you (as it is for us)
            and you simply want to use the software for free. After all, that’s
            what it’s there for :)
            <br />
            <br /> Happy clicking!
          </p>
        </div>
        <div className="my-4">
          <h1 className="text-center scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-xl">
            Deutsch
          </h1>
          <p className="leading-7 mt-2">
            <span className="font-semibold">Liebe Mit-Flugschüler*innen,</span>
            <br />
            wir, Johannes und Luc aus dem LHG2402 der European Flight Academy
            standen, wie ihr wohl aktuell auch, vor kurzem vor unserer AZF/BZF
            Prüfung.
            <br />
            <br />
            Unserer Meinung nach sollte für solch einen wichtigen Teil der
            Ausbildung kein Geld von den Schüler*innen verlangt werden und uns
            sind keine nutzbaren, kostenlosen Plattformen bekannt. Wir haben uns
            also dazu entschlossen, das Problem selbst in die Hand zu nehmen und
            uns an die Arbeit gemacht.
            <br />
            <br /> Das Projekt macht uns sehr viel Spaß, jedoch kostet es viel
            Zeit und auch ein wenig Geld, daher haben wir uns entschlossen einen
            Spendenlink einzubauen, den ihr unten findet.
            <br />
            <br /> Wir freuen uns über alles was ihr bereit seid zu geben und
            haben natürlich Verständnis falls bei euch (wie auch bei uns) das
            Geld aktuell knapp ist und ihr die Software einfach kostenlos nutzen
            möchtet, dafür ist sie schließlich da :)
            <br />
            <br /> Happy clicking!
          </p>
        </div>
      </div>
      <div className="flex justify-center my-6">
        <a href="https://ko-fi.com/U7U0168HCE" target="_blank">
          <Image
            height="500"
            width={200}
            src="https://storage.ko-fi.com/cdn/kofi6.png?v=6"
            alt="Buy Me a Coffee at ko-fi.com"
          />
        </a>
      </div>
    </div>
  );
};

export default SupportPage;
