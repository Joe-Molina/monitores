import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
 
export function MyToast() {
  const date = new Date

  return (
    <Button
      variant="outline"
      onClick={() =>
        toast(`Event has been created`, {
          description: date.toLocaleString(),
        })
      }
    >
      Show Toast
    </Button>
  )
}