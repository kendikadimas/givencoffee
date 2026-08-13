<?php

namespace App\Support;

class ContentParser
{
    /**
     * Convert admin textarea syntax into content blocks.
     * Lines starting with "## " become h2 headings, everything else a paragraph.
     */
    public static function blocks(string $text): array
    {
        $blocks = [];

        foreach (preg_split('/\r?\n/', $text) as $line) {
            $line = trim($line);

            if ($line === '') {
                continue;
            }

            if (str_starts_with($line, '## ')) {
                $blocks[] = ['type' => 'h2', 'text' => trim(substr($line, 3))];
            } else {
                $blocks[] = ['type' => 'p', 'text' => $line];
            }
        }

        return $blocks;
    }

    public static function toText(array $blocks): string
    {
        return implode("\n", array_map(
            fn (array $block) => $block['type'] === 'h2' ? '## '.$block['text'] : $block['text'],
            $blocks,
        ));
    }

    /**
     * Parse "Label: Value" lines into [{label, value}].
     */
    public static function labelValue(string $text): array
    {
        $rows = [];

        foreach (preg_split('/\r?\n/', $text) as $line) {
            $line = trim($line);

            if ($line === '') {
                continue;
            }

            $parts = explode(':', $line, 2);

            if (count($parts) === 2) {
                $rows[] = ['label' => trim($parts[0]), 'value' => trim($parts[1])];
            }
        }

        return $rows;
    }

    public static function labelValueToText(array $rows): string
    {
        $lines = [];

        foreach ($rows as $row) {
            $label = $row['label'] ?? '';
            $value = $row['value'] ?? '';

            if (is_array($label)) {
                $label = $label['en'] ?? '';
            }

            if (is_array($value)) {
                $value = $value['en'] ?? '';
            }

            $lines[] = "{$label}: {$value}";
        }

        return implode("\n", $lines);
    }
}
