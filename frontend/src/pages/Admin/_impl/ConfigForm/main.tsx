import { useEffect, useState, useCallback } from 'react';
import { z } from 'zod';
import api from '@/services/api';
import { GameConfig } from '@/types/game';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common/Card';

// Schema for client-side validation
const configSchema = z.object({
  minRange: z.number({ coerce: true }).int('Minimum range must be an integer.'),
  maxRange: z.number({ coerce: true }).int('Maximum range must be an integer.'),
}).refine(data => data.minRange < data.maxRange, {
  message: 'Minimum range must be strictly less than maximum range.',
  path: ['minRange'], // Attach error to minRange field for simplicity
});

type ValidationErrors = z.ZodFormattedError<GameConfig> | null;

export const ConfigForm = () => {
  const [config, setConfig] = useState<GameConfig>({ minRange: 1, maxRange: 100 });
  const [initialLoading, setInitialLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(null);

  const fetchConfig = useCallback(async () => {
    try {
      const response = await api.get<GameConfig>('/game/config');
      setConfig(response.data);
    } catch (err) {
      setError('Failed to load game configuration.');
    } finally {
      setInitialLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConfig(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    // Reset states
    setValidationErrors(null);
    setSuccessMessage(null);
    setError(null);
    
    // Validate
    const result = configSchema.safeParse(config);
    if (!result.success) {
      setValidationErrors(result.error.format());
      return;
    }

    setIsSaving(true);
    try {
      await api.put('/game/config', result.data);
      setSuccessMessage('Configuration saved successfully!');
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to save configuration.';
      setError(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  if (initialLoading) {
    return <p>Loading configuration...</p>;
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Game Configuration</CardTitle>
        <CardDescription>Set the minimum and maximum range for the secret number.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="minRange" className="text-sm font-medium">Minimum Range</label>
            <Input 
              id="minRange"
              name="minRange"
              type="number"
              value={config.minRange}
              onChange={handleInputChange}
            />
            {validationErrors?.minRange && <p className="text-sm text-red-500">{validationErrors.minRange._errors.join(', ')}</p>}
          </div>
          <div className="space-y-2">
            <label htmlFor="maxRange" className="text-sm font-medium">Maximum Range</label>
            <Input 
              id="maxRange"
              name="maxRange"
              type="number"
              value={config.maxRange}
              onChange={handleInputChange}
            />
            {validationErrors?.maxRange && <p className="text-sm text-red-500">{validationErrors.maxRange._errors.join(', ')}</p>}
          </div>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Configuration'}
          </Button>
          {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      </CardContent>
    </Card>
  );
};
