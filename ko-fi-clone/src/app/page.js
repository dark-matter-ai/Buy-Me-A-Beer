// app/page.js

import ProfileSection from "./components/ProfileSection";
import ContentSection from "./components/ContentSection";
import FAQSection from "./components/FAQSection";

export default function Home() {
  return (
    <div>
      <ProfileSection />
      <ContentSection />
      <FAQSection />
    </div>
  );
}
