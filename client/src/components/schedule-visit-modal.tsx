import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ContactForm from "./contact-form";

interface ScheduleVisitModalProps {
  trigger?: React.ReactNode;
  floorPlan?: string;
}

export default function ScheduleVisitModal({ trigger, floorPlan }: ScheduleVisitModalProps) {
  const [open, setOpen] = useState(false);

  const defaultTrigger = (
    <Button className="bg-warm-brown-700 hover:bg-warm-brown-800 text-white">
      Schedule Visit
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            Schedule a Visit
            {floorPlan && (
              <span className="text-warm-brown-700 font-normal"> - {floorPlan}</span>
            )}
          </DialogTitle>
        </DialogHeader>
        <ContactForm
          type="schedule_visit"
          title=""
          className="border-0 shadow-none"
        />
      </DialogContent>
    </Dialog>
  );
}
