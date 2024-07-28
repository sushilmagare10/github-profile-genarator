import ProfileForm from "@/components/ProfileForm/ProfileForm";
import ProfilePreview from "@/components/ProfilePreview";

export default function Home() {


  return (
    <main className="flex justify-between gap-4 p-4 h-full w-full">
      <ProfileForm />
      <ProfilePreview />
    </main>
  );
}
