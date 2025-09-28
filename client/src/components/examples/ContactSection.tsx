import ContactSection from '../ContactSection';
import { TooltipProvider } from '@/components/ui/tooltip';

export default function ContactSectionExample() {
  return (
    <TooltipProvider>
      <ContactSection />
    </TooltipProvider>
  );
}