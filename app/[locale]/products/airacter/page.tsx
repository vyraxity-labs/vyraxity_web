import "./airacter.css";
import { AiracterHero } from "@/components/sections/airacter/AiracterHero";
import { RelationshipToVyraxity } from "@/components/sections/airacter/RelationshipToVyraxity";

export default function AiracterPage() {
  return (
    <>
      <div className="airacter-scope w-full">
        <AiracterHero />
      </div>
      <RelationshipToVyraxity />
    </>
  );
}


