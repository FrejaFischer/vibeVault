import { useState } from "react";
import { useCreateEntry } from "@/hooks/useCreateEntry";
import Button from "./Button";
import InputGroup from "./InputGroup";
import { DialogTitle, DialogFooter, DialogHeader } from "./ui/dialog";
import { validateCoverImage, validateDescription, validateEndPeriod, validatePlaylistLink, validateStartPeriod, validateTitle } from "@/validation/entryValidation";
import { useNavigate } from "react-router";

const EntryForm = () => {
  const createEntry = useCreateEntry(); // Hook to create a new entry
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    playlist_link: "",
    cover_image: "",
    description: "",
    start_period: "",
    end_period: "",
  });

  const [errors, setErrors] = useState<Record<string, string[]>>({});

  /**
   * Handles onChange events for all inputs
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string[]> = {};

    const { title, playlist_link, cover_image, description, start_period, end_period } = formData;

    const formattedStart = start_period ? `${start_period} 00:00:00` : "";
    const formattedEnd = end_period ? `${end_period} 00:00:00` : "";

    // Validate all inputs
    const titleErrors = validateTitle(title);
    if (titleErrors.length) newErrors.title = titleErrors;

    const playlistLinkErrors = validatePlaylistLink(playlist_link);
    if (playlistLinkErrors.length) newErrors.playlist_link = playlistLinkErrors;

    const coverImageErrors = validateCoverImage(cover_image);
    if (coverImageErrors.length) newErrors.cover_image = coverImageErrors;

    const descriptionErrors = validateDescription(description);
    if (descriptionErrors.length) newErrors.description = descriptionErrors;

    const startPeriodErrors = validateStartPeriod(start_period);
    if (startPeriodErrors.length) newErrors.start_period = startPeriodErrors;

    const endPeriodErrors = validateEndPeriod(end_period);
    if (endPeriodErrors.length) newErrors.end_period = endPeriodErrors;

    setErrors(newErrors);

    // If there are no errors, submit the form
    if (Object.keys(newErrors).length === 0) {
      try {
        const newEntry = await createEntry({
          title,
          playlist_link: playlist_link || "",
          cover_image, // File upload handling is not implemented
          description,
          start_period: formattedStart,
          end_period: formattedEnd || null,
        });

        // Reset form
        setFormData({
          title: "",
          playlist_link: "",
          cover_image: "",
          description: "",
          start_period: "",
          end_period: "",
        });
        setErrors({});

        navigate(`/entries/${newEntry.entry_id}`);
      } catch (error) {
        setErrors({ general: ["Failed to create entry. System error"] });
        console.error("client error", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle className="pb-4">Create new entry</DialogTitle>
      </DialogHeader>
      <div className="overflow-y-scroll max-h-[70vh]">
        <div className="pt-5 pb-7 px-1">
          <InputGroup inputType="text" id="txtTitle" inputName="title" labelText="Title" onChange={handleChange} errors={errors.title} />
          <InputGroup inputType="text" id="txtPlaylistLink" inputName="playlist_link" labelText="Playlist Link" onChange={handleChange} errors={errors.playlist_link} />
          <InputGroup inputType="file" id="txtCoverImage" inputName="cover_image" labelText="Cover Image" onChange={handleChange} errors={errors.cover_image} />
          <InputGroup inputType="textarea" id="txtDescription" inputName="description" labelText="Description" onChange={handleChange} errors={errors.description} />
          <div className="md:flex md:gap-2">
            <InputGroup inputType="date" id="txtStartDate" inputName="start_period" labelText="Start Date" onChange={handleChange} errors={errors.start_period} />
            <InputGroup inputType="date" id="txtEndDate" inputName="end_period" labelText="End Date" onChange={handleChange} errors={errors.end_period} />
          </div>
        </div>
      </div>
      <DialogFooter className="pt-6">
        <Button text="Create entry" type="submit" version="positive" />
      </DialogFooter>
    </form>
  );
};

export default EntryForm;
