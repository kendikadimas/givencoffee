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

        // If the string contains HTML tags from Quill rich text editor, parse HTML elements
        if ($text !== strip_tags($text)) {
            $dom = new \DOMDocument();
            // Suppress warnings for HTML5 elements / fragments
            libxml_use_internal_errors(true);
            $dom->loadHTML('<?xml encoding="utf-8" ?><div>' . $text . '</div>', LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
            libxml_clear_errors();

            $container = $dom->getElementsByTagName('div')->item(0);
            if ($container) {
                foreach ($container->childNodes as $node) {
                    if ($node->nodeType === XML_ELEMENT_NODE) {
                        $tag = strtolower($node->nodeName);
                        if (in_array($tag, ['h1', 'h2', 'h3'])) {
                            $inner = '';
                            foreach ($node->childNodes as $child) {
                                $inner .= $node->ownerDocument->saveHTML($child);
                            }
                            $blocks[] = ['type' => 'h2', 'text' => trim($inner)];
                        } elseif ($tag === 'p') {
                            $inner = '';
                            foreach ($node->childNodes as $child) {
                                $inner .= $node->ownerDocument->saveHTML($child);
                            }
                            $blocks[] = ['type' => 'p', 'text' => trim($inner)];
                        } elseif (in_array($tag, ['ul', 'ol'])) {
                            $blocks[] = ['type' => $tag, 'text' => trim($node->ownerDocument->saveHTML($node))];
                        } else {
                            $blocks[] = ['type' => 'html', 'text' => trim($node->ownerDocument->saveHTML($node))];
                        }
                    }
                }
            }

            if (!empty($blocks)) {
                return $blocks;
            }
        }

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
