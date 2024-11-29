import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { relationshipTypes } from '@/constants/RelationshipModel';
import { RelationshipTypeView } from '@/components/onboarding/RelationshipTypeView';

const RelationshipTypeScreen: React.FC = () => {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const handleNext = () => {
    if (selectedType) {
      router.push({
        pathname: '/onboarding/question',
        params: { relationshipType: selectedType },
      });
    } else {
      alert('관계 유형을 선택해주세요.');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <RelationshipTypeView
        types={relationshipTypes}
        selectedType={selectedType}
        onSelect={setSelectedType}
        onNext={handleNext}
      />
    </SafeAreaView>
  );
};

export default RelationshipTypeScreen;
