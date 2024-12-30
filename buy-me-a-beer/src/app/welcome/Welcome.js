import ProfileSection from "../components/ProfileSection";
import ContentSection from "../components/ContentSection";
import FAQSection from "../components/FAQSection";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";

export default function Welcome() {
  return (
    <>
      <Header />
      <ProfileSection />
      <ContentSection />
      <FAQSection />
      <Footer />
      <Chatbot />
    </>
  );
}
