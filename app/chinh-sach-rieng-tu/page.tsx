import PrivacyPolicy from '@/components/privacy-policy';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: {
      absolute: 'Chính sách riêng tư',
    },
}
   

const Page = () => {
    return (
        <PrivacyPolicy/>
    );
};

export default Page;
